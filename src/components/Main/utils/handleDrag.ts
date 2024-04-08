import { Dispatch } from '@reduxjs/toolkit';
import { DropResult } from 'react-beautiful-dnd';

import { IssueColumnT } from '@/services';
import { moveIssue } from '@/redux/issues/issuesSlice';

export const handleDrag =
	(columns: IssueColumnT[], dispatch: Dispatch) =>
	({ source, destination }: DropResult) => {
		// Make sure we have a valid destination
		if (destination === undefined || destination === null) return null;

		// Make sure we're actually move the item
		if (
			source.droppableId === destination.droppableId &&
			destination.index === source.index
		) {
			return null;
		}

		// Set start end end variables
		const start = columns.find((col) => col.type === source.droppableId);
		const end = columns.find((col) => col.type === destination.droppableId);

		// If start is the same as end, we're in the same column
		if (start === end) {
			// Move the item within the list
			// Start by making a new list without the dragged item
			const newList = start!.content.filter(
				(_: any, idx: number) => idx !== source.index,
			);

			// Then insert the item at the right location
			newList.splice(destination.index, 0, start!.content[source.index]);

			// Then create a new copy of the column object
			const newCol = {
				type: start!.type,
				title: start!.title,
				content: newList,
			};

			// Update the state
			dispatch(
				moveIssue(
					columns.map((item) => (item.type === newCol.type ? newCol : item)),
				),
			);

			return null;
		} else {
			// If start is different from end, we need to update multiple columns
			// Filter the start list like before
			const newStartList = start!.content.filter(
				(_: any, idx: number) => idx !== source.index,
			);

			// Create a new start column
			const newStartCol = {
				type: start!.type,
				title: start!.title,
				content: newStartList,
			};

			// Make a new end list array
			// const newEndList = end!.content;
			const newEndList = [...end!.content];

			// Insert the item into the end list
			newEndList.splice(destination.index, 0, start!.content[source.index]);

			// Create a new end column
			const newEndCol = {
				type: end!.type,
				title: end!.title,
				content: newEndList,
			};

			// Update the state
			dispatch(
				moveIssue(
					columns.map((item) => {
						if (item.type === newStartCol.type) {
							return newStartCol;
						} else if (item.type === newEndCol.type) {
							return newEndCol;
						} else {
							return item;
						}
					}),
				),
			);

			return null;
		}
	};

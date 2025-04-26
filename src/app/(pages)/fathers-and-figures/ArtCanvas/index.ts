// Barrel file for the ArtCanvas component
// This file re-exports all the components, hooks and types used in the ArtCanvas component
// so they can be imported from a single source

// Export the main ArtCanvas component
export { default as ArtCanvas } from './ArtCanvas';

// Export the DraggablePhoto component used inside ArtCanvas
export { default as DraggablePhoto } from './DraggablePhoto';

// Export the Instruction component used inside ArtCanvas
export { default as Instruction } from './Instruction';

// Export the usePhotoStyle hook used inside ArtCanvas for generating and mapping random styles to DraggablePhoto elements
export { usePhotoStyle } from './usePhotoStyleHook';

// Export the types used inside ArtCanvas for photoStyles and DraggablePhoto component
export * from './types';
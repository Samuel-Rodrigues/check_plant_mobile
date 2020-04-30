/*export function startingSynchronization() {
  return {
    type: '@annotation/STARTING_SYNCHRONIZATION',
  };
}

export function endSynchronization() {
  return {
    type: '@annotation/END_SYNCHRONIZATION',
  };
} */

export function synchronizeAnnotationSuccess(data) {
  return {
    type: '@annotation/SYNCHRONIZE_ANNOTATION_SUCCESS',
    payload: data,
  };
}

export function createAnnotation(data) {
  return {
    type: '@annotation/CREATE',
    payload: data,
  };
}

export function deleteAllAnnotation(data) {
  return {
    type: '@annotation/DELETE',
  };
}

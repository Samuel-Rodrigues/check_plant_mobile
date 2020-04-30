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
/*
export function deleteAllAnnotation(data) {
  return {
    type: '@annotation/DELETE',
  };
}
*/

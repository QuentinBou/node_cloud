exports.handleErrors = (wood) => {
  let errors = {};
  const {name, typeId, hardnessId} = wood;
  if (!name) {
    errors = {
      ...errors,
      name: 'Wood name is required',
    };
  } else if (typeof name !== 'string') {
    errors = {
      ...errors,
      name: 'Wood name must be a string',
    };
  }
  if (!typeId) {
    errors = {
      ...errors,
      typeId: 'Wood type is required',
    };
  } else if (typeof typeId !== 'number') {
    errors = {
      ...errors,
      typeId: 'Wood type must be a number',
    };
  }
  if (!hardnessId) {
    errors = {
      ...errors,
      hardnessId: 'Wood hardness is required',
    };
  } else if (typeof hardnessId !== 'number') {
    errors = {
      ...errors,
      hardnessId: 'Wood hardness must be a number',
    };
  }
  return Object.keys(errors).length !== 0 ? errors : null;
};

exports.deleteImage = (wood) => {
  const filename = wood.image.split('/uploads/')[1];
  fs.unlink(`uploads/${filename}`, () => {
    console.log(`Image ${filename} deleted`);
  });
};

/* eslint-disable linebreak-style */
const createLinks = async (req, wood) => {
  return [
    {rel: 'self', method: 'GET', title: 'Get Wood', href: `${req.protocol}://${req.get('host')}/api/wood/${wood.id}`},
    {rel: 'list', method: 'GET', href: `${req.protocol}://${req.get('host')}/api/wood`},
    {rel: 'hardness', method: 'GET', title: 'Get Wood by Hardness', href: `${req.protocol}://${req.get('host')}/api/wood/hardness/${wood.hardness.id}`},
    {rel: 'type', method: 'GET', title: 'Get Wood by Type', href: `${req.protocol}://${req.get('host')}/api/wood/type/${wood.hardness.id}`},
    {rel: 'update', method: 'PUT', title: 'Update Wood', href: `${req.protocol}://${req.get('host')}/api/wood/${wood.id}`},
    {rel: 'delete', method: 'DELETE', title: 'Delete Wood', href: `${req.protocol}://${req.get('host')}/api/wood/${wood.id}`},
  ];
};

exports.addLinksToWoods = async (req, woods) => {
  const woodsWithLinks = await Promise.all(
      woods.map(async (wood) => {
        const links = await createLinks(req, wood);
        return {
          ...wood.toJSON(),
          links: links,
        };
      }),
  );
  return woodsWithLinks;
};

exports.addLinksToWood = async (req, wood) => {
  const links = await createLinks(req, wood);
  return {
    ...wood.toJSON(),
    links: links,
  };
};



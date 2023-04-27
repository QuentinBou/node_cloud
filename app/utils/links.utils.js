/* eslint-disable linebreak-style */
const createWoodLinks = async (req, wood) => {
  return [
    {rel: 'self', method: 'GET', title: 'Get Wood', href: `${req.protocol}://${req.get('host')}/api/wood/${wood.id}`},
    {rel: 'list', method: 'GET', href: `${req.protocol}://${req.get('host')}/api/wood`},
    {rel: 'hardness', method: 'GET', title: 'Get Wood by Hardness', href: `${req.protocol}://${req.get('host')}/api/wood/hardness/${wood.hardness.id}`},
    {rel: 'type', method: 'GET', title: 'Get Wood by Type', href: `${req.protocol}://${req.get('host')}/api/wood/type/${wood.hardness.id}`},
    {rel: 'update', method: 'PUT', title: 'Update Wood', href: `${req.protocol}://${req.get('host')}/api/wood/${wood.id}`},
    {rel: 'delete', method: 'DELETE', title: 'Delete Wood', href: `${req.protocol}://${req.get('host')}/api/wood/${wood.id}`},
  ];
};

const createUserLinks = async (req) => {
  return [
    {rel: 'update-pwd', method: 'PUT', title: 'Update Password', href: `${req.protocol}://${req.get('host')}/api/auth/update-password`, body: {password: 'string', newPassword: 'string', newPasswordValidate: 'string'}},
    {rel: 'update-email', method: 'PUT', title: 'Update Email', href: `${req.protocol}://${req.get('host')}/api/auth/update-email`, body: {email: `${req.body.email}`, newEmail: 'string'}},
    {rel: 'delete', method: 'DELETE', title: 'Delete User', href: `${req.protocol}://${req.get('host')}/api/auth/delete`},
  ];
};

exports.addLinksToWoods = async (req, woods) => {
  const woodsWithLinks = await Promise.all(
      woods.map(async (wood) => {
        const links = await createWoodLinks(req, wood);
        return {
          ...wood.toJSON(),
          links: links,
        };
      }),
  );
  return woodsWithLinks;
};

exports.addLinksToWood = async (req, wood) => {
  const links = await createWoodLinks(req, wood);
  return {
    ...wood.toJSON(),
    links: links,
  };
};

exports.addLinksToUser = async (req, user) => {
  const links = await createUserLinks(req);
  return {
    ...user,
    links: links,
  };
};



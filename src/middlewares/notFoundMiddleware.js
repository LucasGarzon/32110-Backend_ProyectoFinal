export const notFoundMiddleware = (req, res) => {
  res.status(404).render('error', { message: `Route <span style="color: green;">${req.protocol}://${req.get('host')}${req.url}</span> method <span style="color: green;">${req.method}</span> not implemented` });
};



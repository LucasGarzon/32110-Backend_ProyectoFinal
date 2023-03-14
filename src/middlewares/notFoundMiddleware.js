export const notFoundMiddleware = (req, res) => {
  res.status(404).render('error', { message: `El método <span style="color: green;">${req.method}</span> no está disponible en la ruta <span style="color: green;">${req.protocol}://${req.get('host')}${req.url}</span>` });
};



export const notFoundMiddleware = (req, res) => {
  res.status(404).render('error', { message: `Route <span style="color: green;">${req.baseUrl}${req.url}</span> method <span style="color: green;">${req.method}</span> not implemented` });
};



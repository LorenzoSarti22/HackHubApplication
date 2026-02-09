import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Recupera il token salvato nel localStorage dopo il login
  const token = localStorage.getItem('token');

  // Se il token esiste, "cloniamo" la richiesta originale aggiungendo l'header di sicurezza
  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(authReq);
  }

  // Se non c'è il token (es. durante il login stesso), la richiesta prosegue normalmente
  return next(req);
};

// src/app.ts
import express from 'express';
import { createServer } from 'http';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import session from 'express-session';
import dotenv from 'dotenv';
dotenv.config();
dotenv.config({ path: '../../backend/.env' });
import contactRouter from './contact/contactRoute';
import routerHealth from './health/health';

import helmet from "helmet";

const app = express();

app.use((req, res, next) => {

  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  res.setHeader("Content-Security-Policy", "frame-ancestors 'self';");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader("Referrer-Policy", "no-referrer-when-downgrade");
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");

  next();
});

app.use(
  helmet({
    frameguard: { action: "sameorigin" },
    contentSecurityPolicy: false, 
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// app.use((req, res, next) => {
//   const origin = req.headers.origin;
//   if (origin === 'https://www.infobeatlive.com' || origin === 'https://infobeatlive.com') {
//     res.setHeader('Access-Control-Allow-Origin', origin);
//   }

//   res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   res.setHeader("Access-Control-Allow-Credentials", "true");

//   if (req.method === 'OPTIONS') {
//     res.sendStatus(204);
//   } else {
//     next();
//   }
// });

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin === 'https://www.infobeatlive.com' || origin === 'https://infobeatlive.com' || origin === 'http://localhost:3000') {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === 'OPTIONS') {
    res.sendStatus(204);
  } else {
    next();
  }
});

app.use(morgan('combined'));
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET! as string,
    resave: false,
    saveUninitialized: false,
    cookie: {
      sameSite: "none",
      secure: process.env.NODE_ENV === "production", 
      httpOnly: true,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

const server = createServer(app);

app.use('/api/health', routerHealth);
app.use('/api/contact', contactRouter);

const PORT = process.env.PORT!;
server.listen(PORT, '0.0.0.0' as any, () => {
  console.log(`Server is running on port ${PORT}`);
});

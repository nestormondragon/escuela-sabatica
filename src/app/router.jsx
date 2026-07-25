import React from "react";
import {
  Navigate,
  createBrowserRouter,
} from "react-router-dom";
import AppLayout from "./AppLayout.jsx";
import RouteError from "./RouteError.jsx";
import TodayRoute from "../routes/TodayRoute.jsx";
import MosaicRoute from "../routes/MosaicRoute.jsx";
import SabbathRoute from "../routes/SabbathRoute.jsx";
import LessonsRoute from "../routes/LessonsRoute.jsx";
import LessonRoute from "../routes/LessonRoute.jsx";
import EpisodeRoute from "../routes/EpisodeRoute.jsx";
import TeacherRoute from "../routes/TeacherRoute.jsx";
import PresentationRoute from "../routes/PresentationRoute.jsx";
import SettingsRoute from "../routes/SettingsRoute.jsx";
import NotFoundRoute from "../routes/NotFoundRoute.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <RouteError />,
    children: [
      { index: true, element: <Navigate to="/hoy" replace /> },
      { path: "hoy", element: <TodayRoute /> },
      { path: "mosaico", element: <MosaicRoute /> },
      { path: "sabado", element: <SabbathRoute /> },
      { path: "sabado/:lessonId", element: <SabbathRoute /> },
      { path: "lecciones", element: <LessonsRoute /> },
      { path: "leccion/:lessonId", element: <LessonRoute /> },
      {
        path: "leccion/:lessonId/episodio/:episodeId",
        element: <EpisodeRoute />,
      },
      { path: "maestro/:lessonId", element: <TeacherRoute /> },
      { path: "presentar/:lessonId", element: <PresentationRoute /> },
      { path: "ajustes", element: <SettingsRoute /> },
      { path: "*", element: <NotFoundRoute /> },
    ],
  },
]);

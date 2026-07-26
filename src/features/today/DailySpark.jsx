import React from "react";
import Icon from "../../components/Icon.jsx";
import DepthChooser from "./DepthChooser.jsx";
import ReturnThread from "./ReturnThread.jsx";
import KineticHeading from "../../components/KineticHeading.jsx";
import { useI18n } from "../../i18n/LocaleProvider.jsx";
import {
  materialFamilyForVerb,
  visualForLesson,
} from "../../visual-world/lessonVisualManifest.js";

export default function DailySpark({
  lesson,
  episode,
  depth,
  onDepthChange,
  onBegin,
  onFinishToday,
  returnItem,
  onResolveReturn,
}) {
  const { t } = useI18n();
  const materialFamily = materialFamilyForVerb(
    visualForLesson(lesson.id).materialVerb
  );
  return (
    <section className="daily-spark" aria-labelledby="daily-spark-title">
      <div className="daily-spark-thread" aria-hidden="true" />
      <div className="daily-spark-meta">
        <span>{episode?.canonicalDay || t("nav.today")}</span>
        <span>{lesson.verse.ref}</span>
      </div>

      <ReturnThread item={returnItem} onResolve={onResolveReturn} />

      <KineticHeading
        id="daily-spark-title"
        className="daily-spark-question"
      >
        {episode?.title || lesson.subtitle}
      </KineticHeading>

      <p className="daily-spark-cue">
        {episode?.cue || lesson.subtitle}
      </p>

      <DepthChooser
        value={depth}
        availability={episode?.depthAvailability}
        onChange={onDepthChange}
      />

      <button className="world-action" type="button" onClick={onBegin}>
        <span>
          <small>{t(`ritual.material.${materialFamily}.kicker`)}</small>
          {t("today.openSpark")}
        </span>
        <Icon name="arrow" size={20} />
      </button>

      <button className="quiet-exit" type="button" onClick={onFinishToday}>
        {t("today.finish")}
      </button>
    </section>
  );
}

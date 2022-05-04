import React, { useEffect } from "react";
import { useRef } from "react";
import Hls from "hls.js";
import Plyr from "plyr";
import { controls, source } from "../../utils/constant";
import { persian } from "../../i18n/fa";

const PlyrJS = (props: any) => {
  const ref = useRef<any>(null);
  const hlsRef = useRef<Hls | null>(null);

  useEffect(() => {
    const video: any = document.querySelector("#plyr");
    const defaultOptions: any = {};

    if (!Hls.isSupported()) {
    } else {
      const hls = new Hls();
      hlsRef.current = hls;

      hlsRef.current.loadSource(source);
      hlsRef.current.on(Hls.Events.MANIFEST_PARSED, () => {
          const availableQualities = hlsRef.current!.levels.map((l) => l.height);
          availableQualities.unshift(0);
          ref.current.play();
          defaultOptions.quality = {
            default: 0,
            options: availableQualities,
            forced: true,
            onChange: (e: any) => updateQuality(e),
          };

          defaultOptions.i18n = persian;
          defaultOptions.tooltips = {
            controls: true,
            seek: true,
            volume: true,
            playbackRate: true,
            captions: true,
            fullscreen: true,
          };

          defaultOptions.controls = controls;

          hls.on(Hls.Events.LEVEL_SWITCHED, function (event, data) {
            var span: any = document.querySelector(
              ".plyr__menu__container [data-plyr='quality'][value='0'] span"
            );
            if (hls.autoLevelEnabled) {
              span.innerHTML = `AUTO (${hls.levels[data.level].height}p)`;
            } else {
              span.innerHTML = `AUTO`;
            }
          });

          var player = new Plyr(video, defaultOptions);
          ref.current = player;
        });

      hlsRef.current.attachMedia(ref.current as any);
      hlsRef.current = hlsRef.current;
    }

    const updateQuality = (newQuality: any) => {
      if (newQuality === 0) {
        hlsRef.current!.currentLevel = -1;
      } else {
        hlsRef.current!.levels.forEach((level: any, levelIndex: any) => {
          if (level.height === newQuality) {
            console.log("Found quality match with " + newQuality);
            hlsRef.current!.currentLevel = levelIndex;
          }
        });
      }
    };
  }, [ref]);

  return (
    <div className="">
      <video id="plyr" ref={ref} autoPlay></video>
    </div>
  );
};

export default PlyrJS;

import { DEMO_MESSAGES } from "../lib/data";
import FeedLine from "./FeedLine";
import { DownloadButton, DownloadMeta } from "./DownloadButton";
import heroImage from "../assets/hero-desk.jpg?inline";

const FEED = [DEMO_MESSAGES[0], DEMO_MESSAGES[1], DEMO_MESSAGES[5], DEMO_MESSAGES[7]];

export default function Cover() {
  return (
    <section id="top" className="relative isolate overflow-hidden border-b border-white/10">
      <div className="absolute inset-y-0 right-0 hidden w-[47%] lg:block" aria-hidden="true">
        <img
          src={heroImage}
          alt=""
          width={1560}
          height={878}
          fetchPriority="high"
          className="h-full w-full object-cover object-[58%_44%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#08060f_0%,rgba(8,6,15,.88)_24%,rgba(8,6,15,.42)_62%,rgba(8,6,15,.18)_100%)]" />
        <div className="absolute inset-y-0 right-0 w-28 bg-[linear-gradient(90deg,transparent,#08060f)]" />
      </div>

      <div className="wrap relative pb-14 pt-24 sm:pt-28 lg:pb-20 lg:pt-32">
        <div className="max-w-[660px]">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-faint">
            <span className="text-cyan">Windows 10 и 11</span>
            <span aria-hidden="true" className="text-white/25">
              /
            </span>
            <span>бесплатно</span>
          </div>

          <h1 className="mt-5 text-[clamp(2.3rem,5.4vw,4.2rem)] leading-[0.95]">Чат всех ваших стримов в одном окне</h1>

          <p className="mt-6 max-w-[42ch] text-[17.5px] leading-[1.65] text-muted">
            Пока вы в игре, сообщения, донаты и события канала приходят в одно окно — без переключения между сайтами
            площадок и без второго монитора.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <DownloadButton />
          </div>
          <DownloadMeta className="mt-3" />
        </div>

        <div className="mt-10 lg:mt-16 lg:max-w-[660px]">
          <div className="flex items-baseline justify-between gap-4 pb-1">
            <span className="text-[12.5px] text-muted">Лента: так выглядит общий чат</span>
            <span className="flex items-center gap-1.5 text-[12.5px] text-cyan">
              <span className="live-dot size-1.5 rounded-full bg-cyan" aria-hidden="true" />в эфире
            </span>
          </div>
          <div>
            {FEED.map((message, index) => (
              <FeedLine key={index} message={message} />
            ))}
          </div>
        </div>

        <div className="mt-10 h-52 overflow-hidden border-t border-white/10 lg:hidden">
          <img
            src={heroImage}
            alt=""
            width={1560}
            height={878}
            className="h-full w-full object-cover object-[62%_42%]"
          />
        </div>
      </div>
    </section>
  );
}

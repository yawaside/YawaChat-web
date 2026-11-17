import liveImage from "../assets/live-studio.jpg?inline";

/** Полоса-иллюстрация на всю ширину: пауза между разделами документа. */
export default function Plate() {
  return (
    <figure className="border-y border-white/10">
      <img
        src={liveImage}
        alt="Стример за столом: игра на мониторе и колонка чата рядом"
        width={1600}
        height={686}
        loading="lazy"
        className="h-[clamp(200px,32vw,420px)] w-full object-cover object-[70%_50%]"
      />
      <figcaption className="wrap py-3 text-[12.5px] text-faint">
        Так чат выглядит на стриме: игра, лента и донаты в одном кадре
      </figcaption>
    </figure>
  );
}

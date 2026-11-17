import logo from "../assets/logo.png?inline";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-line sm:mt-24">
      <div className="wrap flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <img src={logo} alt="" width={32} height={32} className="size-8 rounded-[8px]" />
          <div>
            <div className="text-[14.5px] font-bold leading-tight">YawaChat</div>
            <div className="text-[13px] text-faint">Чат всех ваших стримов в одном окне</div>
          </div>
        </div>
        <div className="meta flex flex-wrap items-center gap-4">
          <span>лицензия MIT · © YawaSide</span>
          <a
            href="#top"
            className="text-text underline decoration-line underline-offset-4 transition-colors duration-150 hover:decoration-brand-ink"
          >
            наверх
          </a>
        </div>
      </div>
    </footer>
  );
}

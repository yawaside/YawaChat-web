import logo from "../assets/logo.png?inline";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="wrap flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <img src={logo} alt="" width={36} height={36} className="size-9 rounded-[9px]" />
          <div>
            <div className="font-display text-[16px] font-bold leading-tight">YawaChat</div>
            <div className="text-[13px] text-ink-faint">Чат всех ваших стримов в одном окне</div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-ink-faint">
          <span>Лицензия MIT, © YawaSide</span>
          <a
            href="#top"
            className="font-medium text-ink underline decoration-line underline-offset-4 transition-colors duration-150 hover:decoration-brand"
          >
            Наверх
          </a>
        </div>
      </div>
    </footer>
  );
}

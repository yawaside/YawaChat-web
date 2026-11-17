import logo from "../assets/logo.png?inline";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 sm:mt-28">
      <div className="wrap flex flex-col gap-5 py-9 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <img src={logo} alt="" width={34} height={34} className="size-[34px] rounded-[9px]" />
          <div>
            <div className="font-display text-[15px] font-bold leading-tight">YawaChat</div>
            <div className="text-[13px] text-faint">Чат всех ваших стримов в одном окне</div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-faint">
          <span>Лицензия MIT, © YawaSide</span>
          <a
            href="#top"
            className="font-medium text-muted underline decoration-white/20 underline-offset-4 transition-colors duration-150 hover:text-text"
          >
            Наверх
          </a>
        </div>
      </div>
    </footer>
  );
}

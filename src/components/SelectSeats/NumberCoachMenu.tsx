import { TCoach } from "../../models";

type NumberCoachMenuProps = {
  direction: "from" | "to";
  activeTypeCoach: {
    from: string,
    to: string
  };
  coaches: TCoach[];
  openedCoaches: string[];
  onSelect: (coachNumber: string) => void;
}

const NumberCoachMenu = ({ coaches, openedCoaches, onSelect }: NumberCoachMenuProps) => {
  return (
    <div className="select-seats__coach-number">
      <span className="select-seats__coach-menu-title">Вагоны</span>
      <nav className="select-seats__coach-menu">
        {[...coaches].reverse().map((item) => {
          return (
            <a
              key={item.coachNumber}
              href="#"
              className={`select-seats__coach-number-link ${openedCoaches.includes(item.coachNumber)
                ? 'active'
                : ''}`}
              onClick={(e) => {
                e.preventDefault();
                onSelect(item.coachNumber);
              }}
            >
              {item.coachNumber}
            </a>
          )
        })}
      </nav>
      <span className="select-seats__coach-menu-info">
        Нумерация вагонов начинается с головы поезда
      </span>
    </div>

  );
}

export default NumberCoachMenu;
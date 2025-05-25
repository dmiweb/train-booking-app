import "./OrderProgressBar.css";

const OrderProgressBar = ({ stepNumber }: { stepNumber: number }) => {
  const orderSteps = ["Билеты", "Пассажиры", "Оплата", "Проверка"];

  const stepStyle = "order-progress-bar__step";
  const stepStyleActive = "order-progress-bar__step order-progress-bar__step--active";

  return (
    <section className="order-progress-bar">
      {orderSteps.map((step, index) =>
        <div key={step} id={String(index + 1)} className={stepNumber >= index + 1 ? stepStyleActive : stepStyle}>
          <div className="order-progress-bar__step-number">{index + 1}</div>
          <div className="order-progress-bar__step-name">{step}</div>
          <div className="arrow-right"></div>
        </div>
      )}
    </section>
  );
}

export default OrderProgressBar;
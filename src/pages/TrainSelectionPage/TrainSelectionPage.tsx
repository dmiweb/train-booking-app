import { TicketSearchForm, LoadingProgressBar, OrderProgressBar} from "../../components";
import "./TrainSelectionPage.css";

const TrainSelectionPage = () => {
  return (
    <>
    <aside></aside>
      <section className="order-tickets-section">
        <div className="order-tickets-section__container">
          <TicketSearchForm />
        </div>
      </section>
      <OrderProgressBar stepNumber={1} />
      <LoadingProgressBar />
      
      <section></section>
    </>
  );
}

export default TrainSelectionPage;
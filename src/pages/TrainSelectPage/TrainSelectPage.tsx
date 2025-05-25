import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setOpenModal, setCloseModal } from "../../slices/modalSlice";
import { requestTrains, setPage, cancelRequestTrains } from "../../slices/trainSlice";
import { setOffset } from "../../slices/queryParamsSlice";
import { requestLastTickets, cancelRequestLastTickets } from "../../slices/lastTicketsSlice";
import { TLastTicket, TTrain } from "../../models";
import {
  Modal, Loader, LoadingProgressBar, OrderProgressBar, TicketSearchForm, FilterPanel,
  TrainListToolbar, LastTicketsWidget, LastTicketItem, Train, List, Pagination, MessageWidget
} from "../../components";
import "./TrainSelectPage.css";

const TrainSelectPage = () => {
  const { items, total_count } = useAppSelector(state => state.trains.trains);
  const { page, trains, loading, error } = useAppSelector(state => state.trains);
  const { limit, offset } = useAppSelector(state => state.queryParams);
  const { lastTickets } = useAppSelector(state => state.lastTickets);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(requestLastTickets());
    dispatch(requestTrains());

    return () => {
      dispatch(cancelRequestLastTickets());
      dispatch(cancelRequestTrains());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [offset]);

  // const callbacks = {
  //   // Добавление в корзину
  //   addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
  //   // Открытие модалки корзины
  //   openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  // };

  const renders = {
    lastTicket: useCallback(
      (item: TLastTicket) => {
        return <LastTicketItem item={item} />;
      },
      // onAdd={callbacks.addToBasket}
      []),

    trains: useCallback(
      (item: TTrain) => {
        return <Train item={item} />
      }, []),
  };

  const onChangePage = (pageNumber: number) => {
    if (pageNumber === page) return;

    if (pageNumber !== 1) {
      const offset = (pageNumber - 1) * limit;
      dispatch(setOffset(offset));
      dispatch(setPage(pageNumber));
    } else {
      dispatch(setOffset(0));
      dispatch(setPage(pageNumber));
    }

    dispatch(requestTrains());
  }

  useEffect(() => {
    if (error) {
      dispatch(setOpenModal());
    } else {
      dispatch(setCloseModal());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return (
    <>
      {error &&
        <Modal>
          <MessageWidget typeMessage="error"
            title={error}
            handlerMessageBtn={() => dispatch(requestTrains())}
          />
        </Modal>}

      <section className="order-tickets-section">
        <div className="order-tickets-section__container">
          <TicketSearchForm />
        </div>
      </section>

      <OrderProgressBar stepNumber={1} />

      <LoadingProgressBar
        start={loading}
        requestStatus={!loading && (items?.length || !items?.length) ? true : false}
        error={error ? true : false}
      />

      {loading && <Loader />}

      {!loading && trains.items &&
        <div className="order-page-wrap">
          <aside className="sidebar">
            <FilterPanel />
            <LastTicketsWidget>
              {lastTickets.length
                ? <List
                  list={lastTickets}
                  classNameItem="last-tickets__item"
                  limit={3}
                  renderItem={renders.lastTicket}
                />
                : null}
            </LastTicketsWidget>
          </aside>

          <main className="main-train-selection-page">
            <TrainListToolbar />

            {items && items.length
              ? <List
                list={items}
                classNameItem="train__list-item"
                renderItem={renders.trains}
              />
              : null}

            <Pagination
              count={total_count}
              page={page}
              limit={limit}
              onChangePage={onChangePage}
            />
          </main>
        </div>}
    </>
  );
}

export default TrainSelectPage;
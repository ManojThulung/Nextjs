import { useRouter } from "next/router";
import Head from "next/head";

import { getAllEvents } from "../../helpers/api-util";
import EventList from "../../components/events/event-list";
import EventsSerach from "../../components/events/events-search";
import NewsletterRegistration from "../../components/input/newsletter-registration";

function Events(props) {
  const allEvents = props.events;
  const router = useRouter();

  function eventSearchHandler(year, month) {
    const path = `/events/${year}/${month}`;

    router.push(path);
  }

  return (
    <div>
      <Head>
        <title>Events</title>
        <meta
          name="description"
          content="Find a lot of great events and add your own event"
        />
      </Head>
      <EventsSerach onSearch={eventSearchHandler} />
      <EventList items={allEvents} />
    </div>
  );
}

export async function getStaticProps() {
  const allEvents = await getAllEvents();

  return {
    props: { events: allEvents },
    revalidate: 1600,
  };
}
export default Events;

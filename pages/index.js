import React, {useEffect} from 'react';
import Head from 'next/head';
import {useSelector} from 'react-redux';
import { getFeaturedEvents } from '../helpers/api-util';
import EventList from '../components/events/event-list';
import NewsletterRegistration from '../components/input/newsletter-registration';
import Notification from '../components/ui/Notification';

function HomePage (props) {
    const { title, message, status, isOpen } = useSelector(
      (state) => state.notification
    );


  return (
    <>
      <div>
        <Head>
          <title>NextJS Events</title>
          <meta
            name='description'
            content='Find a lot of great events that allow you to evolve...'
          />
        </Head>
        <NewsletterRegistration />
        <EventList items={props.events} />
      </div>
      {isOpen && (<Notification title={title} message={message} status={status}/>)}
    </>
    
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800,
  };
}

export default HomePage;

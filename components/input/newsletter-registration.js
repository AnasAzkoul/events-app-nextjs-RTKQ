import {useRef} from 'react'; 
import {useDispatch} from 'react-redux';
import {openNotification, setNotificationSettings, closeNotification} from '../../app/features/notification/notification.slice'; 
import { useAddEmailMutation } from '../../services/events';
import classes from './newsletter-registration.module.css';

function NewsletterRegistration () {
  
  const [addEmail, result] = useAddEmailMutation(); 
  
  const dispatch = useDispatch();

  const emailRef = useRef();

  function registrationHandler (event) {
    event.preventDefault();
    // fetch user input (state or refs)
    const email = emailRef.current.value;
    // send valid data to API
    
    addEmail({email})
      .unwrap()
      .then(fulfilled => {

        emailRef.current.value = ''
        dispatch(
          setNotificationSettings({
            title: 'success',
            message: 'Your email has been added to our newsletter',
            status: 'success',
          })
        ); 
        dispatch(openNotification());
        setTimeout(() => {
          dispatch(closeNotification());
          dispatch(setNotificationSettings({
            title: '',
            message: '',
            status: '',
          }))
        }, 3000)
      })
      .catch(rejected => console.error(rejected)); 
    
    // fetch('/api/newsletter', {
    //   method: 'POST',
    //   body: JSON.stringify({ email }),
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //     if (data.message === 'success') {
    //       dispatch(
    //         setNotificationSettings({
    //           title: 'success',
    //           message: 'Your email has been added to our newsletter',
    //           status: 'success',
    //         })
    //       );
    //       dispatch(openNotification());
          
    //       setTimeout(() => {
    //         dispatch(closeNotification()); 
    //         dispatch(setNotificationSettings({
    //           title: '',
    //           message: '',
    //           status: '',
    //         }))
    //       }, 3000)
    //     }
    //     emailRef.current.value = '';
    //   })
    //   .catch((error) => console.log(error.message));
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
            ref={emailRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;

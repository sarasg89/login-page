import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../../utils/queries';
import AccountDetails from './AccountDetails';
import Auth from '../../utils/auth';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket, faGaugeHigh, faUser } from '@fortawesome/free-solid-svg-icons';

function Profile() {
    const navigate = useNavigate();
    const { data } = useQuery(QUERY_USER);
    let user;

    if (data) {
        user = data.user;
    }

    function Dashboard() {
        

        return (
            <div className='container'>
                <div>
                    <h2>Dashboard</h2>
                </div>
                <div>
                    {user ? (
                        <div className="panel-content">
                            <h3>Hello, <span>{user.firstName}!</span></h3>
                            <p>From your account dashboard you can view your recent orders, view your favorite designs, and edit your password and account details.</p>
                        </div>
                    ) : "loading..."}
                </div>
            </div>
        )
    }


    if (Auth.loggedIn()) {
        return (
            <>
                <div className="profile-page">
                    <Tabs>
                        <aside>
                            <TabList>
                                <Tab>
                                    <p><span><FontAwesomeIcon icon={faGaugeHigh} color="#343131" /></span>Dashboard</p>
                                </Tab>
                                <Tab>
                                    <p><span><FontAwesomeIcon icon={faUser} color="#343131" /></span>Account details</p>
                                </Tab>
                                <Tab onClick={() => navigate('/logout')}>
                                    <p onClick={() => navigate('/logout')}><span><FontAwesomeIcon icon={faRightFromBracket} color="#343131" /></span>Logout</p>
                                </Tab>
                            </TabList>
                        </aside>
                        <section>
                            <TabPanel>
                                {Dashboard()}
                            </TabPanel>
                            <TabPanel>
                                <AccountDetails />
                            </TabPanel>
                            <TabPanel>
                                {/* <>This section is blank on purpose to avoid an error message because there are X tabs and there must be X tab panels. Log out redirects to logout page</> */}
                            </TabPanel>
                        </section>
                    </Tabs>
                </div>
            </>
        )
    } else {
        return (
            <>
                <h3>Oops! You need log in / create an account if you want access to this section.</h3>
            </>
        )
    }
}

export default Profile;
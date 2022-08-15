import React from 'react'
import './NotificationMobile.css'
function NotificationMobile() {
    return (
        <>
            <div className='notification-mobile'>
                <h4
                    style={{ background: "transparent" }}
                >Notification</h4>

                {[1, 2].map(e => (
                    <div className='notification-tile'>
                        Luv added Photo.
                    </div>
                ))
                }

            </div>
        </>
    )
}

export default NotificationMobile

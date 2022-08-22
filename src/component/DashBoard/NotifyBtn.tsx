export const NotifyBtn = (props: any) => {
    return (
        <div className={(props.trigger) ? 'iconContainer active' : 'iconContainer'} 
            onClick={() => props.setTrigger(!props.trigger)}>

            <img src='/img/icon/notification.png' className='icon' alt='navbar-img' />
        </div>
    )
}
export const NotifyBtn = (props:any) =>{
    return(
        <div className="iconContainer"   style={{ background: (props.trigger)? '#FFF2E7':'#fff' }} 
            onClick={() => props.setTrigger(!props.trigger)}>

            <img src='/img/icon/notification.png' className='icon' alt='navbar-img' />
        </div>
    )
}
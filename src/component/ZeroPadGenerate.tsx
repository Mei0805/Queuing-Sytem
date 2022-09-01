export const zeroPad = (props:any) => {
    var zero = props.places - props.num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join("0") + props.num;
}
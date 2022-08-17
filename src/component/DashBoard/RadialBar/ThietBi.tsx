import  { useState } from 'react'
import { RadialBar } from '@ant-design/plots';

export const ThietBiRadial = () =>{
     //Thiết bị
     const [thietBi, setThietBi] = useState<number>(4221)
     const [active, setActive] = useState<number>(3799)
     const [deactive, setDeactive] = useState<number>(422)
 
     //tính phần trăm thiết bị
     const hoatdong = (active/thietBi) *360;
     const ngungHoatdong = (deactive/thietBi) *360;
     const percent =  (active/thietBi) * 100;
 
    const dataThietBi = [
        {
          name: '',
          star: ngungHoatdong,
        },
        {
          name: '2',
          star: hoatdong,
        },
    ];

    const configThietbi:any = {       
        data: dataThietBi,
        xField: 'name',
        yField: 'star',
        width: 60,
        height: 60,
        radius: 1,
        innerRadius: 0.75,
        maxAngle: hoatdong,
        tooltip: {
            showContent: false
        },
        colorField: 'star',
        color: ({ star}:any) => {
          if (star > 50) {
            return '#FF7506';
          } else if (star < 50) {
            return '#7E7D88';
          }
          return '#FF7506';
        },
        barBackground: {},
        barStyle: {
            cursor: 'pointer',
            lineCap: 'round'
        },
        type: 'round',
        annotations: [
            {
                type: 'text',
                position: ['32%', '50%'],
                content: `${percent.toFixed(0)}%`
            }
        ]
      }
    return(
        <RadialBar {...configThietbi} />
    )
}
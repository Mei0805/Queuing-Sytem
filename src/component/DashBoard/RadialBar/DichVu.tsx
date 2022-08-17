import { useState } from 'react'
import { RadialBar } from '@ant-design/plots';

export const DichVuRadial = () =>{
    //Dich Vu
    const [dichVu, setdichVu] = useState<number>(276)
    const [active, setActive] = useState<number>(210)
    const [deactive, setDeactive] = useState<number>(66)

    //tính phần trăm Dich Vu
    const hoatdong = (active/dichVu) *360;
    const ngungHoatdong = (deactive/dichVu) *360;
    const percent =  (active/dichVu) * 100;


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

    const configDichVu:any = {       
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
        color: ({ star }: any) => {
          if (star > (hoatdong / 2)) {
              return '#4277FF';
          } else if (star < hoatdong) {
              return '#7E7D88';
          } 
          return '#7E7D88';
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
        <RadialBar {...configDichVu} />
    )
}
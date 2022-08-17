import React, { useState } from 'react'
import { RadialBar } from '@ant-design/plots';

export const CapSoRadial = () => {
    //Thiết bị
    const [capso, setCapSo] = useState<number>(4221)
    const [used, setUsed] = useState<number>(3721)
    const [wait, setWait] = useState<number>(486)
    const [pass, setPass] = useState<number>(32)

    //tính phần trăm thiết bị
    const sudung = ( used / capso) * 360;
    const dangcho = (wait / capso) * 360;
    const boqua = (pass / capso) * 360;
    const percent = (used / capso) * 100;

    const dataCapso = [
        {
            name: '',
            star: boqua,
        },
        {
            name: '2',
            star: dangcho,
        },
        {
            name: '3',
            star: sudung,
        },
    ];

    const configCapso: any = {
        data: dataCapso,
        xField: 'name',
        yField: 'star',
        width: 60,
        height: 60,
        radius: 1,
        innerRadius: 0.6,
        maxAngle: sudung,
        tooltip: {
            showContent: false
        },
        colorField: 'star',
        color: ({ star }: any) => {
            if (star > (sudung / 2)) {
                return '#35C75A';
            } else if (star < (sudung / 2) && star > 30) {
                return '#7E7D88';
            } else if (star < 30) {
                return '#F178B6';
            }
            return '#35C75A';
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
    return (
        <RadialBar {...configCapso} />
    )
}
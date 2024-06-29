import { ActionIcon, Title } from "@mantine/core"
import {
    Icon,
    IconFireHydrant,
    IconFiretruck,
    IconHome2,
    IconUser,
    IconWaveSquare,
} from '@tabler/icons-react';
import { useRef, useState } from "react";

type ListenGroupItem = {
    name: string,
    icon: any,
    filename: "airport.mp3" |
    "basketball.m4a" |
    "birds.mp3" |
    "busy-street.mp3" |
    "cafe.mp3" |
    "cat-purring.mp3" |
    "cave-drops.mp3" |
    "ceiling-fan.mp3" |
    "chimes.mp3" |
    "chopin.mp3" |
    "church (1).mp3" |
    "church.mp3" |
    "clock.mp3" |
    "cow.mp3" |
    "crickets.mp3" |
    "cuckoo.mp3" |
    "day.mp3" |
    "deep-ocean.mp3" |
    "dog-barking.mp3" |
    "farm.m4a" |
    "fire.m4a" |
    "fire.mp3" |
    "forest1.mp3" |
    "frog.mp3" |
    "heavy-rain3.mp3" |
    "howling-wind.mp3" |
    "keyboard.mp3" |
    "light-rain3.mp3" |
    "night.m4a" |
    "night.mp3" |
    "owl.mp3" |
    "paper.mp3" |
    "playground.m4a" |
    "rails.mp3" |
    "rain.mp3" |
    "rain-on-leaves.mp3" |
    "rain-on-tent.mp3" |
    "rain-on-umbrella.mp3" |
    "rain-on-window3.mp3" |
    "rain-with-thunder.mp3" |
    "relax-piano.mp3" |
    "river.mp3" |
    "river-mountain2.mp3" |
    "rowing-boat.mp3" |
    "seagulls.mp3" |
    "space.mp3" |
    "Spadefoot Toad.mp3" |
    "stream-water.m4a" |
    "temple2.mp3" |
    "thunder2.mp3" |
    "thunderstorm.mp3" |
    "train.mp3" |
    "typewriter.mp3" |
    "water.mp3" |
    "waterfall2.mp3" |
    "waves.mp3" |
    "Western Meadow Lark.mp3" |
    "whale.m4a" |
    "whale.mp3" |
    "wind.m4a" |
    "wind.mp3" |
    "windchimes.mp3" |
    "wind-in-trees.mp3" |
    "wolf.mp3" |
    "yacht.mp3"
}

type ListenGroup = {
    name: string,
    description: string,
    items: ListenGroupItem[]
}

const config: ListenGroup[] = [
    {
        name: '自然',
        description: '大自然的声音，让你放松心情，享受生活',
        items: [
            {
                name: '海浪',
                // 这个可以在当前插件目录下的public/sounds/main里找到
                filename: 'waves.mp3',
                // 这个icon可以在https://tabler.io/找到
                icon: <IconWaveSquare />
            },
            {
                name: '火焰',
                filename: 'fire.mp3',
                icon: <IconFiretruck />
            }
        ]
    }
    // 大自然，雨，动物，场景，城市
    // 请根据filename的枚举，自动归类并输出(建议借助GPT并校对)
]

export default () => {

    const ref = useRef({
        audioMap: {}
    })

    const [activeIDMap, onActiveIDMap] = useState<{
        valueObj: {
            [key: string]: 'initial' | 'playing' | 'paused'
        }
    }>({
        // key: filename, value: status
        valueObj: {}
    })

    return <div className="p-4 w-[500px] mx-auto">
        {
            config.map(x => {
                return (
                    <div className="mb-4">
                        <Title order={2}>{x.name}</Title>
                        <p>{x.description}</p>
                        <div className="space-x-2">
                            {
                                x.items.map(y => {
                                    const st = activeIDMap.valueObj[y.filename]
                                    return <ActionIcon variant={
                                        st == 'playing' ? 'filled' : 'default'
                                    } size='xl' onClick={() => {
                                        const inst = ref.current.audioMap[y.filename]
                                        if (st == 'playing') {
                                            inst.pause()
                                        } else {
                                            inst.play()
                                        }
                                        onActiveIDMap({
                                            valueObj: {
                                                ...activeIDMap.valueObj,
                                                [y.filename]: st == 'playing' ? 'paused' : 'playing'
                                            }
                                        })
                                    }}>
                                        <audio src={"./public/sounds/main/" + y.filename} ref={e => {
                                            if (e) {
                                                ref.current.audioMap[y.filename] = e
                                            }
                                        }} />
                                        {y.icon}
                                    </ActionIcon>
                                })
                            }
                        </div>
                    </div>
                )
            })
        }
    </div>
}
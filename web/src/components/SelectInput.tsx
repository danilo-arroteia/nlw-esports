import * as Select from "@radix-ui/react-select";
import { CaretDown, CheckCircle } from "phosphor-react";
import { useEffect, useState, SelectHTMLAttributes as Attributes  } from "react";

interface Game {
  id: string;
  title: string;
}

type Props = Attributes<HTMLSelectElement> & {
  options: Game[]
	onValueChanged: (value:string) => void
}

export default function SelectInput({ onValueChanged, name, options }:Props) {
  const [games, setGames] = useState<Game[]>([]);
  const [localValue, setLocalValue] = useState('')


  useEffect(() => {
    fetch("http://localhost:3333/games")
      .then((response) => response.json())
      .then((data) => {
        setGames(data);

      });
  }, []);


	function handleChangeValue(value:string) {
	  setLocalValue(value)
	}

	useEffect(() => {
	  onValueChanged(localValue)
	}, [localValue])

  return (
    <Select.Root name={name} defaultValue={localValue} onValueChange={handleChangeValue}>
      <Select.Trigger className="flex flex-start justify-between rounded flex-1 bg-zinc-900 py-3 px-4 gap-1 shadow-lg text-sm placeholder:text-zinc-500 text-zinc-500">
        <div className="flex flex-1 items-center justify-between">
          <Select.Value placeholder="Selecione o game que deseja jogar" />
          <CaretDown size={24} />
        </div>
      </Select.Trigger>

      <Select.Portal className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 absolute">
        <Select.Content className="overflow-hidden bg-zinc-900 rounded-md shadow-lg">
          <Select.Viewport className="p-1">
            <Select.Group className="block relative">
              <Select.Label className="text-zinc-400 font-bold">Games</Select.Label>

              {games.map((game) => {
                return (
                  <div key={game.id}>
                    <Select.Item
                      value={game.id}
                      key={game.id}
                      className=" hover:bg-zinc-800 hover:text-white flex flex-1 justify-between gap-3 items-center bg-zinc-900 py-3 px-4 rounded text-sm text-zinc-500 transition-colors"
                    >
                      <Select.ItemText key={game.id} className="py-3 px-4 rounded text-sm text-white hover:text-white">
                         <span>{`\u2022    `}</span>{game.title}
                      </Select.ItemText>
                      <Select.ItemIndicator>
                        <CheckCircle />
                      </Select.ItemIndicator>
                    </Select.Item>
                    <Select.Separator className="h-[1px] bg-zinc-300 m-1" />
                  </div>
                );
              })}
            </Select.Group>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}

// className="flex flex-1 justify-between gap-3 items-center bg-zinc-900 py-3 px-4 rounded text-sm text-zinc-500"

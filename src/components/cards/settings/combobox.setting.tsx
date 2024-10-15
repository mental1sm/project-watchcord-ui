import { Combobox, ComboboxDropdown, Input, InputBase, useCombobox } from "@mantine/core";
import { useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import { Langs, setLanguageState } from "../../../store/SettingsStateSlice";
import {RootState} from "../../../store";

export type ComboboxItem = {
    name: string;
    value: string;
}

export default function ComboBoxSetting({options}: {options: ComboboxItem[]}) {
    const dispatch = useDispatch();
    const appLanguage = useSelector((state: RootState) => state.settings.lang);

    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });

    const [value, setValue] = useState<string | null>(null);
    const [name, setName] = useState<string | null>(null);
    
    const optionsItems = options.map(item => (
        <Combobox.Option value={item.value} key={item.value}>
            {item.name}
        </Combobox.Option>
    ));

    function handleClick() {
        combobox.toggleDropdown();
    }

    return (
        <Combobox store={combobox} onOptionSubmit={(val) => {
            setValue(val);
            const selectedItem = options.find(i => i.value === val);
            setName(selectedItem ? selectedItem.name : null);
            if (val) {
                dispatch(setLanguageState(val as Langs))
            }
            combobox.closeDropdown();
        }}>
            <Combobox.Target>
                <InputBase
                component="button"
                type="button"
                pointer
                rightSection={<Combobox.Chevron />}
                rightSectionPointerEvents="none"
                onClick={handleClick}
                >
                {options.find(item => item.value === appLanguage)?.name || name || <Input.Placeholder>Pick value</Input.Placeholder>}
                </InputBase>
            </Combobox.Target>
            <ComboboxDropdown>
                <Combobox.Options>
                    {optionsItems}
                </Combobox.Options>
            </ComboboxDropdown>
        </Combobox>
    );

}
export enum MdmFields {
    Input = 'input',
    Email = 'email',
    PhoneNumber = 'tel',
    Url = 'url',
    InputNumber = 'number',
    Date = 'date',
    DateTimeLocal = 'dateTimeLocal',
    Time = 'time',
    Longtext = 'textarea',
    Checkbox = 'checkbox',
    Radio = 'radio',
    File = 'file',
    Range = 'range',
    Select = 'select',
}

export interface MasterView {
    id: number;
    title: string;
    created: Date;
    lastChange: Date;
    detailViewCount: number;
    fields: {
        name: string;
        type: MdmFields;
        isRequired: boolean;
    }[];
    shouldHideEmptyFields: boolean;
}

export interface DetailView {
    id: number;
    masterViewId: number;
    title: string;
    created: Date;
    lastChange: Date;
    fields: MasterView['fields'];
}

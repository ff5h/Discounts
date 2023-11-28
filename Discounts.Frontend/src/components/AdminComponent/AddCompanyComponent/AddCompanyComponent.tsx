import {ChangeEvent, FormEvent, useState} from "react";
import {FormWrapper} from "./AddCompanyComponent.styled";
import {axiosImage, axiosPublic} from "../../../api/axios";

interface Props {

}

type InputType = {
    name: string,
    imageUrl: string
}

interface ImageType {
    image: FormData | null;
}

export const AddCompanyComponent = (props: Props) => {
    const {} = props

    const [data, setData] = useState({
        name: '',
        imageUrl: ''
    });

    const [file, setFile] = useState<File | null>(null);
    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setData({
            ...data,
            [e.target.name]: value
        });
    };
    const handleChangeFile = (e:ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
            const values = e.target.value;
            setData({
                ...data,
                [e.target.name]: values
            });
    };

    const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            axiosImage.post<ImageType>("http://localhost:8080/api/File", formData).then((resp:any) => {
                const companyData = {
                    name: data.name,
                    imageUrl: resp.data
                }
                console.log(resp.data)
                axiosPublic.post<InputType>("http://localhost:8080/api/Company", companyData).then((resp:any) => console.log(resp));
            })
        }
    };

    return(
        <FormWrapper>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">
                    Company Name
                    <input
                        type="name"
                        name="name"
                        value={data.name}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="imageUrl">
                    Image
                    <input
                        type="file"
                        name="imageUrl"
                        value={data.imageUrl}
                        onChange={handleChangeFile}
                    />
                </label>
                <button type="submit">Login</button>
            </form>
        </FormWrapper>
    );
}

export default AddCompanyComponent
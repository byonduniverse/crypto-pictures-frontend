import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

const PictureSchema = Yup.object().shape({
  uri: Yup.string().required("This field is required"),
  name: Yup.string().required("This field is required"),
  description: Yup.string().required("This field is required"),
  author: Yup.string().required("This field is required"),
  createAt: Yup.date().required("This field is required"),
});

type FileState = {
  file?: File;
};

const PictureForm = ({ handleBack, handleSubmit }: { handleBack: Function; handleSubmit: Function; }) => {
  const [preview, setPreview] = useState("");
  const emptyFile: FileState = {};
  const [file, setFile] = useState(emptyFile);

  const formik = useFormik({
    initialValues: {
      uri: "",
      name: "",
      description: "",
      author: "",
      createAt: "",
    },
    validationSchema: PictureSchema,
    onSubmit: (values) => {
      handleSubmit({ file: file.file, ...values });
    }
  });

  const handleFileChange = (files: FileList | null) => {
    if (files) {
      formik.setFieldValue("uri", files[0]);
      setFile({ file: files[0] });
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onloadend = (e) => {
        if (typeof reader.result === "string") {
          console.log(typeof reader.result);
          setPreview(reader.result);
        }
      };
    }
  };

  return (
    <div className="card">
      <div className="w-full rounded overflow-hidden shadow-lg">
        <form onSubmit={formik.handleSubmit}>
          <div className="grid grid-flow-col grid-cols-2 text-left gap-3">
            <div>
              <label htmlFor="uri" className="block text-gray-700 font-bold mb-2 text-xl">Image</label>
              <input
                id="uri"
                name="uri"
                type="file"
                onChange={(e) => handleFileChange(e.target.files)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {formik.errors.uri && formik.touched.uri && <div className="text-red-500">{formik.errors.uri}</div>}
              {
                formik.values.uri &&
                <img src={preview} alt="Your golden images" className="h-72 mx-auto" />
              }
            </div>
            <div>
              <div className="mb-4">
                <label className="block text-gray-700 text-xl font-bold mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  placeholder="Name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
                {formik.errors.name && formik.touched.name && <div className="text-red-500">{formik.errors.name}</div>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-xl font-bold mb-2" htmlFor="description">
                  Description
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="description"
                  type="text"
                  placeholder="Description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                />
                {formik.errors.description && formik.touched.description && <div className="text-red-500">{formik.errors.description}</div>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-xl font-bold mb-2" htmlFor="author">
                  Author
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="author"
                  type="text"
                  placeholder="Author"
                  value={formik.values.author}
                  onChange={formik.handleChange}
                />
                {formik.errors.author && formik.touched.author && <div className="text-red-500">{formik.errors.author}</div>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-xl font-bold mb-2" htmlFor="createAt">
                  Created At
                </label>
                <div className="datepicker relative form-floating mb-3 xl:w-96" data-mdb-toggle-button="false">
                  <input type="date"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Select a date" data-mdb-toggle="datepicker"
                    value={formik.values.createAt}
                    onChange={formik.handleChange}
                    id="createAt"
                    name="createAt"
                  />
                </div>
                {formik.errors.createAt && formik.touched.createAt && <div className="text-red-500">{formik.errors.createAt}</div>}
              </div>
            </div>
          </div>
          <div className="mb-2">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-5" type="submit">
              Mint
            </button>
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" type="button" onClick={() => handleBack()}>
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PictureForm;

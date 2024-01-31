import { useRef, useState } from "react";
import "./FileUpload.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import ExcelLogo from "./../../assets/xcel.png";
import { content, tags as Tags } from './../../data'
import Badge from "../badge";

export default function FileUpload() {
    const [dragActive, setDragActive] = useState(false);
    const [submittedFiles, setSubmittedFiles] = useState(content.map((item) => { return { ...item, tags: [] } }));
    const [fileSubmitted, setFileSubmitted] = useState(false);
    const [tags, setTags] = useState(Tags);
    const inputRef = useRef(null);
    const [files, setFiles] = useState([]);

    function handleChange(e) {
        e.preventDefault();
        console.log("File has been added");
        if (e.target.files && e.target.files[0]) {
            console.log(e.target.files);
            for (let i = 0; i < e.target.files["length"]; i++) {
                setFiles((prevState) => [...prevState, e.target.files[i]]);
            }
        }
    }

    function handleSubmitFile(e) {
        if (files.length === 0) {
            alert("Please select a file");
        } else {
            files.forEach((file) => {
                file.tags = [];
                file.prefix = file.name.split(".")[0];
                file.link = file.name;
            });
            setSubmittedFiles((prevState) => [...prevState, ...files.map((file) => { return { link: file.name, prefix: file.name.split(".")[0], tags: [] } })]);
            setFiles([]);
            setFileSubmitted(true);
        }
    }

    function handleDrop(e) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            for (let i = 0; i < e.dataTransfer.files["length"]; i++) {
                setFiles((prevState) => [...prevState, e.dataTransfer.files[i]]);
            }
        }
    }

    function handleDragLeave(e) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
    }

    function handleDragOver(e) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(true);
    }

    function handleDragEnter(e) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(true);
    }

    function removeFile(fileName, idx) {
        const newArr = [...files];
        newArr.splice(idx, 1);
        setFiles([]);
        setFiles(newArr);
    }

    function openFileExplorer() {
        inputRef.current.value = "";
        inputRef.current.click();
    }

    function handleTagChange(e, link) {
        console.log(e, link)
        setSubmittedFiles((prevState) => {
            return prevState.map((item) => {
                if (item.link === link) {
                    return { ...item, tags: [...item.tags, e.target.value] }
                }
                return item
            })
        })
    }
    function handleOnClose(link, tag) {
        setSubmittedFiles((prevState) => {
            return prevState.map((item) => {
                if (item.link === link) {
                    return { ...item, tags: item.tags.filter((item) => item !== tag) }
                }
                return item
            })
        })
    }

    return (
        <div className="flex items-center justify-center flex-col lg:px-0">
            <div className="form-holder lg:p-5 px-5">
                <form
                    className={`${dragActive ? "drag-unActive" : "drag-active"
                        } flex flex-col items-center justify-center p-10 rounded-lg border-2 border-dotted border-gray-400`}
                    onDragEnter={handleDragEnter}
                    onSubmit={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                >
                    <input
                        placeholder="fileInput"
                        className="hidden"
                        ref={inputRef}
                        type="file"
                        multiple={true}
                        onChange={handleChange}
                        accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
                    />
                    <img src={ExcelLogo} alt="ExcelLogo" />
                    <p className="text-center">
                        Drop your excel sheet here or{" "}
                        <span
                            className="font-bold text-blue-600 cursor-pointer"
                            onClick={openFileExplorer}
                        >
                            <u>Browse</u>
                        </span>{" "}
                    </p>

                    <div className="flex flex-col items-center p-3">
                        {files.map((file, idx) => (
                            <div key={idx} className="flex flex-row space-x-5">
                                <span>{file.name}</span>
                                <span
                                    className="text-red-500 cursor-pointer"
                                    onClick={() => removeFile(file.name, idx)}
                                >
                                    remove
                                </span>
                            </div>
                        ))}
                    </div>
                </form>
                <button
                    className="upload-button"
                    onClick={handleSubmitFile}
                >
                    <FontAwesomeIcon className='upload-icon' icon={faUpload} /> 
                    <span>Upload</span>
                </button>

            </div>
            {fileSubmitted &&
                <>
                    <h1 style={{ fontSize:'16px', fontWeight: '500'}} >Uploads  <p style={{marginLeft: "15px", cursor: "pointer", fontSize: '16px', fontWeight: '400'}} onClick={()=>{setFileSubmitted(false)}}>X</p></h1>
                    <div className="table-wrapper w-full">
                        <div className="py-3 px-5 m-5 rounded-lg bg-gray-100 overflow-x-auto">
                            <table className="w-full border-separate border-spacing-y-3">
                                <thead>
                                    <tr className="py-2">
                                        <th className="text-left p-3">Sl no.</th>
                                        <th className="text-left p-3">Links</th>
                                        <th className="text-left p-3">Prefix</th>
                                        <th className="text-left p-3">Add tags</th>
                                        <th className="text-left p-3">Selected tags</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {submittedFiles.map((file, idx) => (
                                        <tr className="">
                                            <td className="text-left p-3 rounded-l-lg bg-white">{idx + 1}</td>
                                            <td className="text-left p-3 bg-white">{file.link}</td>
                                            <td className="text-left p-3 bg-white">{file.prefix}</td>
                                            <td className="text-left p-3 bg-white">
                                                <select onChange={(e) => handleTagChange(e, file.link)} className=" bg-white border-2 border-gray-200 rounded-lg px-3 py-1 focus:outline-none">
                                                    {tags.filter((item) => !file.tags || !file.tags.includes(item)).map((tag) => (
                                                        <option value={tag}>{tag}</option>
                                                    ))}
                                                </select>
                                            </td>
                                            <td className="text-left p-3 rounded-r-lg bg-white">
                                                {file.tags.map((tag) => (
                                                    <Badge text={tag} onClose={() => {handleOnClose(file.link, tag)}} />
                                                ))}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>

                            </table>
                        </div>
                    </div>
                </>
            }
        </div>
    );
}
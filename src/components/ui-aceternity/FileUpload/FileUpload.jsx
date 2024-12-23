import { cn } from '~/utils/utils.js';
import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { IconUpload } from '@tabler/icons-react';
import { useDropzone } from 'react-dropzone';
import PropTypes from 'prop-types';

const mainVariant = {
    initial: {
        x: 0,
        y: 0,
    },
    animate: {
        x: 20,
        y: -20,
        opacity: 0.9,
    },
};

const secondaryVariant = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
    },
};

export const FileUpload = ({ onChange }) => {
    const [files, setFiles] = useState([]);
    const fileInputRef = useRef(null);

    const handleFileChange = (newFiles) => {
        setFiles((prevFiles) => [...prevFiles, ...newFiles]);
        onChange && onChange(newFiles);
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const { getRootProps, isDragActive } = useDropzone({
        multiple: false,
        noClick: true,
        onDrop: handleFileChange,
        onDropRejected: (error) => {
            console.log(error);
        },
    });

    return (
        <div className="h-full w-full" {...getRootProps()}>
            <motion.div
                onClick={handleClick}
                whileHover="animate"
                className="group/file relative h-full w-full cursor-pointer overflow-hidden"
            >
                <input
                    ref={fileInputRef}
                    id="file-upload-handle"
                    type="file"
                    onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
                    className="hidden"
                />

                <div className="flex flex-col items-center justify-center">
                    <div className="relative mx-auto mt-10 h-full w-full">
                        {files.length > 0 &&
                            files.map((file, idx) => (
                                <motion.div
                                    key={'file' + idx}
                                    layoutId={idx === 0 ? 'file-upload' : 'file-upload-' + idx}
                                    className={cn(
                                        'relative z-40 mx-auto mt-4 flex w-full flex-col items-start justify-start overflow-hidden rounded-md bg-white p-4 md:h-24 dark:bg-neutral-900',
                                        'shadow-sm',
                                    )}
                                >
                                    <div className="flex w-full items-center justify-between gap-4">
                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            layout
                                            className="max-w-xs truncate text-base text-neutral-700 dark:text-neutral-300"
                                        >
                                            {file.name}
                                        </motion.p>
                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            layout
                                            className="w-fit flex-shrink-0 rounded-lg px-2 py-1 text-sm text-neutral-600 shadow-input dark:bg-neutral-800 dark:text-white"
                                        >
                                            {(file.size / (1024 * 1024)).toFixed(2)} MB
                                        </motion.p>
                                    </div>

                                    <div className="mt-2 flex w-full flex-col items-start justify-between text-sm text-neutral-600 md:flex-row md:items-center dark:text-neutral-400">
                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            layout
                                            className="rounded-md bg-gray-100 px-1 py-0.5 dark:bg-neutral-800"
                                        >
                                            {file.type}
                                        </motion.p>

                                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} layout>
                                            modified {new Date(file.lastModified).toLocaleDateString()}
                                        </motion.p>
                                    </div>
                                </motion.div>
                            ))}
                        {!files.length && (
                            <motion.div
                                layoutId="file-upload"
                                variants={mainVariant}
                                transition={{
                                    type: 'spring',
                                    stiffness: 300,
                                    damping: 20,
                                }}
                                className={cn(
                                    'relative z-40 mx-auto mt-4 flex h-32 w-full max-w-[8rem] items-center justify-center rounded-md bg-white group-hover/file:shadow-2xl dark:bg-neutral-900',
                                    'shadow-[0px_10px_50px_rgba(0,0,0,0.1)]',
                                )}
                            >
                                {isDragActive ? (
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="flex flex-col items-center text-neutral-600"
                                    >
                                        Drop it
                                        <IconUpload className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
                                    </motion.p>
                                ) : (
                                    <IconUpload className="h-4 w-4 text-neutral-600 dark:text-neutral-300" />
                                )}
                            </motion.div>
                        )}

                        {!files.length && (
                            <motion.div
                                variants={secondaryVariant}
                                className="absolute inset-0 z-30 mx-auto mt-4 flex h-32 w-full max-w-[8rem] items-center justify-center rounded-md border border-dashed border-sky-400 bg-transparent opacity-0"
                            ></motion.div>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

FileUpload.propTypes = {
    onChange: PropTypes.func.isRequired,
};

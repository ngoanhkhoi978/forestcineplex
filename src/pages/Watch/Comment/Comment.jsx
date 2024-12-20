import images from '~/assets/images/index.js';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import {
    addComment,
    deleteComment,
    fetchEpisodeComments,
    likeComment,
    reportComment,
    unlikeComment,
    unReportComment,
} from '~/services/commentService.js';
import { formatTime } from '~/utils/utils.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserId } from '~/features/user/userSelectors.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid, faFlag as faFlagSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular, faFlag as faFlagRegular } from '@fortawesome/free-regular-svg-icons';
import classNames from 'classnames';
import Modal from '~/components/Modal/Modal.jsx';

function Comment({ episodeId }) {
    const [comments, setComments] = useState(null);
    const [content, setContent] = useState('');
    const userId = useSelector(selectUserId);

    useEffect(() => {
        if (episodeId) {
            fetchEpisodeComments(episodeId).then((comments) => setComments(comments));
        }
    }, [episodeId]);
    const handleDelete = (commentId) => {
        deleteComment(commentId).then(() => setComments((pre) => pre.filter((comment) => comment._id !== commentId)));
    };

    const handleComment = () => {
        if (content) {
            addComment(episodeId, content).then((cmt) => {
                setContent('');
                setComments([...comments, cmt]);
            });
        }
    };

    console.log(comments);

    return (
        <section className="bg-transparent py-8 antialiased">
            <div className="mx-auto">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-gray-900 lg:text-2xl dark:text-white">
                        Comments ({comments?.length})
                    </h2>
                </div>
                <form className="mb-6 flex flex-col items-end">
                    <div className="mb-4 w-full rounded-lg rounded-t-lg border border-gray-700 bg-transparent/50 px-4 py-2">
                        <label htmlFor="comment" className="sr-only">
                            Your comment
                        </label>
                        <textarea
                            id="comment"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handleComment();
                                }
                            }}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows="6"
                            className="w-full border-0 bg-transparent px-0 text-sm text-gray-900 focus:outline-none focus:ring-0 dark:text-white dark:placeholder-gray-400"
                            placeholder="Write a comment..."
                            required
                        ></textarea>
                    </div>
                    <button
                        onClick={handleComment}
                        type="button"
                        className="mb-2 me-2 w-32 rounded-lg bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 px-5 py-2.5 text-center text-sm font-medium text-white shadow-sm shadow-teal-500/50 hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-teal-300 dark:shadow-lg dark:shadow-teal-800/80 dark:focus:ring-teal-800"
                    >
                        Comment
                    </button>
                </form>

                <div>
                    {comments &&
                        comments.length > 0 &&
                        comments
                            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                            .map((comment) => (
                                <RowComment
                                    key={comment._id}
                                    comment={comment}
                                    episodeId={episodeId}
                                    handleDelete={handleDelete}
                                />
                            ))}
                </div>
            </div>
        </section>
    );
}

Comment.propTypes = {
    episodeId: PropTypes.string,
};

const RowComment = ({ comment = {}, handleDelete }) => {
    const userId = useSelector(selectUserId);
    const [isLike, setLike] = useState(comment.likes.includes(userId));
    const [isReport, setReport] = useState(comment.reports.includes(userId));
    const [isOpenDeleteModel, setIsOpenDeleteModel] = useState(false);

    const [count, setCount] = useState(0);

    useEffect(() => {
        if (isLike && !comment.likes.includes(userId)) {
            likeComment(comment._id).then(() => {
                comment.likes = [...comment.likes, userId];
                setCount((pre) => pre + 1);
            });
        } else if (!isLike && comment.likes.includes(userId)) {
            unlikeComment(comment._id).then(() => {
                comment.likes = comment.likes.filter((like) => like !== userId);
                setCount((pre) => pre + 1);
            });
        }
    }, [isLike]);

    useEffect(() => {
        if (isReport && !comment.reports.includes(userId)) {
            reportComment(comment._id).then(() => {
                comment.reports = [...comment.reports, userId];
                setCount((pre) => pre + 1);
            });
        } else if (!isReport && comment.reports.includes(userId)) {
            unReportComment(comment._id).then(() => {
                comment.reports = comment.reports.filter((report) => report !== userId);
                setCount((pre) => pre + 1);
            });
        }
    }, [isReport]);

    return (
        <article className="mb-3 select-none border-t border-gray-700 bg-transparent py-6 text-base">
            <footer className="mb-2 flex items-center justify-between">
                <div className="flex items-center">
                    <p
                        className={classNames('mr-3 inline-flex items-center text-sm font-semibold text-gray-400', {
                            '!text-white': userId === comment.userId._id,
                        })}
                    >
                        <img className="mr-2 size-8 rounded-md" src={images.avatar} alt="Bonnie Green" />
                        {comment?.userId?.fullName}
                    </p>
                    <span className="me-2 rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                        {comment?.userId?.username}
                    </span>

                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        <div>{formatTime(comment?.createdAt)}</div>
                    </p>
                </div>
            </footer>
            <p className="min-h-12 text-lg text-gray-500 dark:text-gray-400">{comment?.content}</p>
            <div className="mt-4 flex items-center space-x-4">
                <button className={'flex items-center'} onClick={() => setLike((pre) => !pre)}>
                    <FontAwesomeIcon icon={faHeartSolid} className={classNames({ hidden: !isLike })} />
                    <FontAwesomeIcon icon={faHeartRegular} className={classNames({ hidden: isLike })} />
                    <span className="ml-1 text-sm">({comment.likes?.length ?? '0'})</span>
                </button>
                <button className={'flex items-center'} onClick={() => setReport((pre) => !pre)}>
                    <FontAwesomeIcon icon={faFlagSolid} className={classNames({ hidden: !isReport })} />
                    <FontAwesomeIcon icon={faFlagRegular} className={classNames({ hidden: isReport })} />
                    <span className="ml-1 text-sm">({comment.reports?.length ?? '0'})</span>
                </button>

                {userId === comment.userId._id && (
                    <>
                        <button
                            onClick={() => setIsOpenDeleteModel(true)}
                            type="button"
                            className="flex items-center text-sm font-medium hover:text-red-900 hover:underline"
                        >
                            delete
                        </button>
                        <Modal isOpen={isOpenDeleteModel} onClose={setIsOpenDeleteModel}>
                            <div className="relative h-40 w-full rounded-lg bg-[#252728] md:w-[548px]">
                                <div className={'border-b border-[#65686c] py-4'}>
                                    <h1 className={'text-center text-xl font-medium'}>Delete comment?</h1>
                                </div>
                                <div className="px-2 pt-2">
                                    <h1>Are you sure you want to delete this comment?</h1>
                                </div>
                                <div className={'absolute bottom-0 right-0'}>
                                    <button
                                        onClick={() => setIsOpenDeleteModel(false)}
                                        type="button"
                                        className="mb-2 me-2 rounded-lg border-gray-700 bg-transparent px-5 py-2.5 text-sm font-medium text-white hover:bg-[#484c4e] focus:outline-none focus:ring-4 focus:ring-gray-700"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        onClick={() => {
                                            handleDelete(comment._id);
                                            setIsOpenDeleteModel(false);
                                        }}
                                        type="button"
                                        className="mb-2 me-2 rounded-lg bg-green-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-800"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </Modal>
                    </>
                )}
            </div>
        </article>
    );
};
RowComment.propTypes = {
    comment: PropTypes.object,
    episodeId: PropTypes.string,
    handleDelete: PropTypes.func,
};

export default Comment;

import { Post } from "../models/PostModel.js";
import User from "../models/userModel.js";

//-------------------- Create a new post --------------------------
export const createPost = async (req, res) => {
    try {
        const { text } = req.body;

        const post = new Post({
            text,
            file: req.file.path,
            author: req.user._id,
        });

        const savedPost = await post.save();

        // res.status(200).json(savedPost);
        res.status(200).json({ message: 'Post created successfully', savedPost });
    } catch (error) {
        res
        console.error('An error occurred while retrieving posts.', error);
        res.status(500).json({ message: 'Failed post' })
    }
};

//------------------------------ Get All Posts ----------------------------------

// export const getAllPosts = async (req, res) => {
//     try {
//         const posts = await Post.find()
//             // console.log("getAllPosts ~ posts:", posts)
//             // .populate("author", "userName")

//             // Assuming you have an "Author" model with "_id" and "username" fields
//             .populate({
//                 path: "comments",
//                 populate: [
//                     {
//                         path: "author",
//                         select: ["firstName", "lastName", "text", "avatar"],
//                     },
//                     {
//                         path: "replyComments",
//                         populate: {
//                             path: "author",
//                             select: ["firstName", "lastName", "text", "avatar"],
//                         },
//                     },
//                 ],

//             });

//         // .populate("likes", "_id username"); // Assuming you have an "Author" model with "_id" and "username" fields

//         res.status(200).json(posts);
//     } catch (error) {
//         res
//             .status(500)
//             .json({ error: "An error occurred while retrieving posts." });
//     }
// };

export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate({
                path: "author",
                select: ["firstName", "lastName", "avatar"],
            })
            .populate({
                path: "comments",
                populate: [
                    {
                        path: "author",
                        select: ["firstName", "lastName", "text", "avatar"],
                    },
                    {
                        path: "replyComments",
                        populate: {
                            path: "author",
                            select: ["firstName", "lastName", "text", "avatar"],
                        },
                    },
                ],
            });

        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while retrieving posts." });
    }
};


//----------------------------- Get USER Data-----------------------------------
export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;


        const posts = await Post.find({ author: userId })
            .populate({
                path: "author",
                select: ["firstName", "lastName", "avatar"],
            })
            .populate({
                path: "comments",
                populate: [
                    {
                        path: "author",
                        select: ["firstName", "lastName", "text", "avatar"],
                    },
                    {
                        path: "replyComments",
                        populate: {
                            path: "author",
                            select: ["firstName", "lastName", "text", "avatar"],
                        },
                    },
                ],
            });


        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while retrieving posts." });
    }
};

//----------------------------- Get Single Post-----------------------------------
export const getSinglePost = async (req, res) => {
    try {
        const { postId } = req.params;
        console.log('postId', postId)

        // Assuming you have a valid ObjectId for postId
        const post = await Post.findById(postId)
            .populate({
                path: "author",
                select: ["firstName", "lastName", "avatar"],
            })
            .populate({
                path: "comments",
                populate: [
                    {
                        path: "author",
                        select: ["firstName", "lastName", "text", "avatar"],
                    },
                    {
                        path: "replyComments",
                        populate: {
                            path: "author",
                            select: ["firstName", "lastName", "text", "avatar"],
                        },
                    },
                ],
            });

        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        res.status(200).json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while retrieving the post." });
    }
};


//------------------------------ Delete Post ----------------------------------

export const deletePost = async (req, res) => {
    try {
        // const postId = req.params._id;
        const { postId } = req.params;
        console.log(" deletePost ~ postId:---", postId)

        // Find the post by ID and check if it belongs to the authenticated user
        const post = await Post.findOneAndDelete({ _id: postId, author: req.user._id });
        console.log("🚀 ~ deletePost ~ post:", post)

        if (!post) {
            return res.status(404).json(
                { message: 'Post not found or you are not authorized to delete it' });
        }

        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error('An error occurred while deleting the post.', error);
        res.status(500).json({ message: 'Failed to delete the post' });
    }
};


//--------------------------- Share Post ------------------------------
// export const sharePost = async (req, res) => {
//     try {
//         const { postId } = req.params;
//         const { text } = req.body;
//         // console.log('text', text)
//         // console.log('postId', postId)

//         const originalPost = await Post.findById(postId);
//         console.log("🚀  originalPost:", originalPost)
//         if (!originalPost) {
//             return res.status(404).json({ message: 'Post not found' });
//         }

//         const sharedPost = new Post({
//             text,
//             author: req.user._id,
//             sharedPost: originalPost._id,
//             // originalPost,
//         });

//         const savedSharedPost = await sharedPost.save();
//         res.status(200).json({ message: 'Post shared successfully', sharedPost: savedSharedPost });
//     } catch (error) {
//         console.error('An error occurred while sharing the post.', error);
//         res.status(500).json({ message: 'Failed to share the post' });
//     }
// };


export const sharePost = async (req, res) => {
    try {
        const { postId } = req.params;

        // Find the post by its ID
        const post = await Post.findById(postId);
        const link = postId
        console.log("🚀 ~ file: postController.js:232 ~ sharePost ~ post:", post)
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        // Update the "shared" field of the post to true
        post.shared = true;
        // await post.save();
        const sharedPost = new Post({
            text: `Share Post ${link}`,
            author: req.user._id,
            sharedPost: post._id,

        });
        await sharedPost.save();

        res.status(200).json({ message: "Post shared successfully", post });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while sharing the post." });
    }
};
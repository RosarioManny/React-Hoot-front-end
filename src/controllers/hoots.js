
// Implent in Future - MANNY
const hoot = await Hoot.findById(req.params.hootId).populate([
    'author',
    'comments.author',
]);

if (!hoot.author._id.equals(req.user._id)) {
    return res.status(403).send("You're not allowed to do that!");
}
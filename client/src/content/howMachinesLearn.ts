// ─────────────────────────────────────────────────────────────────────────────
// ✍️  YOUR WRITING LIVES HERE.
//
// Each key below maps to one chapter on the "How Machines Learn" page.
// Write in Markdown — it's rendered with the same styling as your blog posts.
// Replace the placeholder text as you read through the book; the page works
// fine with any mix of finished and unfinished sections.
// ─────────────────────────────────────────────────────────────────────────────

export const prose: Record<string, string> = {
    intro: `*✍️ Write your introduction here — why you picked up the book, what this
page is, and what the reader should expect. A few sentences is plenty.*`,

    perceptron: `*✍️ Your notes on the Perceptron — Rosenblatt, the Mark I, the
1958 New York Times hype ("the embryo of an electronic computer that will be
able to walk, talk, see…"), and what the convergence theorem actually promises.*`,

    adaline: `*✍️ Your notes on ADALINE — Widrow & Hoff at Stanford, memistors,
and the quiet revolution of minimizing a smooth error with gradient descent
instead of just fixing mistakes.*`,

    bayesDecision: `*✍️ Your notes on Bayesian decision theory — risk, loss
functions, and why the "best" decision depends on what mistakes cost.*`,

    bayesOptimal: `*✍️ Your notes on the Bayes optimal classifier — why it's the
theoretical gold standard, why we can almost never build it (we don't know the
true distributions), and what "Bayes error" means.*`,

    naiveBayes: `*✍️ Your notes on Naive Bayes — the independence assumption,
why it's wrong, why it works anyway, and the spam-filter era it powered.*`,

    knn: `*✍️ Your notes on k-nearest neighbors — Fix & Hodges (1951), Cover &
Hart's astonishing 1967 result (1-NN's error is at most twice the Bayes error),
and the curse of dimensionality.*`,

    pca: `*✍️ Your notes on PCA — Pearson (1901) and Hotelling (1933), variance
maximization vs. reconstruction-error minimization being the same problem, and
eigenfaces if you want a fun detour.*`,

    svm: `*✍️ Your notes on support vector machines — Vapnik & Chervonenkis's
theory, the 1992 kernel paper with Boser & Guyon, maximum margins, and why SVMs
ruled the 90s and 2000s while neural nets sat in the corner.*`,

    hopfield: `*✍️ Your notes on Hopfield networks — the 1982 paper, energy
landscapes, content-addressable memory, and how a physicist's view of spin
glasses pulled neural networks back from the dead (and earned a 2024 Nobel).*`,

    universalApprox: `*✍️ Your notes on the universal approximation theorem —
Cybenko (1989) and Hornik, what it guarantees (existence) and what it
conspicuously doesn't (learnability, efficiency).*`,

    backprop: `*✍️ Your notes on backpropagation — Rumelhart, Hinton & Williams
(1986), the chain rule done cleverly, earlier sightings (Werbos 1974, Linnainmaa
1970), and how it ended the first AI winter for connectionists.*`,

    neocognitron: `*✍️ Your notes on the Neocognitron — Fukushima (1980), S-cells
and C-cells inspired by Hubel & Wiesel's cat visual cortex experiments, and how
it anticipated CNNs more than a decade early.*`,

    cnn: `*✍️ Your notes on convolutional neural networks — LeCun reading zip
codes at Bell Labs, LeNet-5 (1998), the long quiet years, and then AlexNet
(2012): GPUs, ReLU, dropout, ImageNet, and everything changing at once.*`,

    outro: `*✍️ Wrap up the story — where the book leaves off, what surprised
you most, and what you want to learn next.*`,
}

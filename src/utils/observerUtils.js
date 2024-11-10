/**
 * Handles the intersection event for an observed element.
 *
 * When the element intersects with the viewport, this function adds the
 * 'show-element' class and removes the 'hidden-element' class from the target element.
 * It then stops observing the target element.
 *
 * @param {IntersectionObserverEntry} entry - The intersection observer entry.
 * @param {IntersectionObserver} observer - The intersection observer.
 */
function handleIntersection(entry, observer) {
  if (entry.isIntersecting) {
    entry.target.classList.add('show-element');
    entry.target.classList.remove('hidden-element');
    observer.unobserve(entry.target);
  }
}

/**
 * Initializes observers to monitor elements with the class 'hidden-element'.
 *
 * This function sets up two observers:
 * 1. An IntersectionObserver to handle visibility changes of elements with the class 'hidden-element'.
 * 2. A MutationObserver to detect and observe newly added elements with the class 'hidden-element'.
 *
 * The IntersectionObserver calls `handleIntersection` for each entry when the visibility of observed elements changes.
 *
 * The MutationObserver monitors the entire document for new elements being added. If a new element or any of its nested elements
 * have the class 'hidden-element', they are observed by the IntersectionObserver.
 *
 * Existing elements with the class 'hidden-element' are also observed when this function is called.
 *
 * Note: This method should only be called once in the entire application, preferably in the App.vue.
 */
const observeElements = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => handleIntersection(entry, observer));
  });

  const mutationObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type !== 'childList') return;

      mutation.addedNodes.forEach((node) => {
        if (node.nodeType !== 1) return;

        if (node.classList.contains('hidden-element')) {
          observer.observe(node);
        }

        // Check for nested hidden elements
        node.querySelectorAll('.hidden-element').forEach((nestedNode) => {
          observer.observe(nestedNode);
        });
      });
    });
  });

  // Observe existing hidden elements
  document.querySelectorAll('.hidden-element').forEach((element) => {
    observer.observe(element);
  });

  // Observe the entire document for new hidden elements
  mutationObserver.observe(document.body, { childList: true, subtree: true });
};

export { observeElements };

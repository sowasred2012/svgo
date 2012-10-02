var regEnableBackground = /^new\s0\s0\s(\d+)\s(\d+)$/,
    elems = ['svg', 'mask', 'pattern'];

/**
 * Remove or cleanup enable-background attr which coincides with a width/height box.
 *
 * @see http://www.w3.org/TR/SVG/filters.html#EnableBackgroundProperty
 *
 * @example
 * <svg width="100" height="50" enable-background="new 0 0 100 50">
 *             ⬇
 * <svg width="100" height="50">
 *
 * @param {Object} item current iteration item
 * @param {Object} params plugin params
 * @return {Boolean} if false, item will be filtered out
 *
 * @author Kir Belevich
 */
exports.cleanupEnableBackground = function(item, params) {

    if (
        item.isElem(elems) &&
        item.hasAttr('enable-background') &&
        item.hasAttr('width') &&
        item.hasAttr('height')
    ) {

        var match;

        if (match = item.attr('enable-background').value.match(regEnableBackground)) {
            if (
                item.attr('width').value == match[1] &&
                item.attr('height').value == match[2]
            ) {
                if (item.isElem('svg')) {
                    item.removeAttr('enable-background');
                } else {
                    item.attr('enable-background').value = 'new';
                }
            }
        }

    }

};

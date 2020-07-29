import { connect } from 'react-redux';
import { arrayPush } from 'redux-form';
import SeoInfoMetadata from 'ui/pages/common/SeoInfoMetadata';

export const mapDispatchToProps = (dispatch, { languages }) => ({
  onPushMetadata: ({ metakey, metavalue }) => {
    const meta = {
      key: metakey,
      type: 'name',
      value: metavalue,
      useDefaultLang: false,
    };
    languages.forEach((lang) => {
      dispatch(arrayPush(
        'page',
        `seoData.seoDataByLang.${lang.code}.metaTags`,
        { ...meta },
      ));
    });
  },
});

export default connect(null, mapDispatchToProps, null, {
  pure: false,
})(SeoInfoMetadata);

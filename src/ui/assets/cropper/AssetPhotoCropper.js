import React, { Component, createRef, Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  Button,
  Grid,
  Row,
  Col,
  FormGroup,
  FormControl,
  InputGroup,
  ButtonGroup,
} from 'patternfly-react';
import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import Cropper from 'react-cropper';

class AssetPhotoCropper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      croppedImg: null,
      aspectRatio: 16 / 9,
      dataX: '',
      dataY: '',
      dataW: '',
      dataH: '',
      dataRotate: '0',
      dataScaleX: '1',
      dataScaleY: '1',
    };
    this.cropper = createRef();
    this.onCropDetailsChange = this.onCropDetailsChange.bind(this);
    this.cropCommand = this.cropCommand.bind(this);
    this.aspectRatioClicked = this.aspectRatioClicked.bind(this);
  }

  componentDidMount() {
    const { onDidMount } = this.props;
    onDidMount();
  }

  onCropDetailsChange(e) {
    const {
      x, y, width, height, rotate, scaleX, scaleY,
    } = e.detail;

    this.setState({
      dataX: Math.round(x),
      dataY: Math.round(y),
      dataW: Math.round(width),
      dataH: Math.round(height),
      dataRotate: rotate || '0',
      dataScaleX: scaleX || '',
      dataScaleY: scaleY || '',
    });
  }

  setAspectRatio(aspectRatio) {
    this.setState({ aspectRatio });
  }

  setCroppedImg(croppedImg) {
    this.setState({ croppedImg });
  }

  cropCommand(ev) {
    const { action } = ev.currentTarget.dataset;
    const { dataScaleX, dataScaleY } = this.state;
    const crop = this.cropper.current;
    switch (action) {
      case 'move':
        crop.setDragMode('move');
        break;
      case 'crop':
        crop.setDragMode('crop');
        break;
      case 'scaley':
        crop.scaleY(dataScaleY === 1 ? -1 : 1);
        break;
      case 'scalex':
        crop.scaleX(dataScaleX === 1 ? -1 : 1);
        break;
      case 'panleft':
        crop.move(-10, 0);
        break;
      case 'panright':
        crop.move(10, 0);
        break;
      case 'pandown':
        crop.move(0, 10);
        break;
      case 'panup':
        crop.move(0, -10);
        break;
      case 'rotateleft':
        crop.rotate(45);
        break;
      case 'rotateright':
        crop.rotate(-45);
        break;
      case 'zoomin':
        crop.zoom(0.1);
        break;
      case 'zoomout':
        crop.zoom(-0.1);
        break;
      case 'save': {
        const dataURL = crop.getCroppedCanvas().toDataURL();
        this.setCroppedImg(dataURL);
        const { input } = this.props;
        crop.getCroppedCanvas().toBlob((blob) => {
          input.onChange(blob);
        });
        break;
      }
      case 'cancel': {
        const { input } = this.props;
        this.setCroppedImg(null);
        input.onChange(null);
        crop.clear();
        break;
      }
      default:
        break;
    }
  }

  aspectRatioClicked(ev) {
    const { value } = ev.currentTarget.dataset;
    if (value === 'NaN') {
      this.setAspectRatio(0);
    } else {
      const ratios = value.split(':');
      this.setAspectRatio(ratios[0] / ratios[1]);
    }
  }

  render() {
    const {
      assetInfo,
      imgSrc,
      cropRatios,
    } = this.props;
    const { metadata, versions } = assetInfo;
    const {
      aspectRatio,
      croppedImg,
      dataX,
      dataY,
      dataW,
      dataH,
      dataRotate,
      dataScaleX,
      dataScaleY,
    } = this.state;

    const renderDiffSizes = () => (
      (versions && versions.length > 0) ? (
        <Grid fluid className="AssetPhotoCropper__imginfo dim">
          <Row>
            <Col xs={12}>
              <h5 className="caption"><FormattedMessage id="cms.assets.form.details" /></h5>
            </Col>
          </Row>
          {versions.map(img => (
            <Row key={img.sizetype}>
              <Col xs={5}>{img.dimensions}</Col>
              <Col xs={4}><FormattedMessage id={`cms.assets.form.size.${img.sizetype}`} /></Col>
              <Col xs={3}>{img.size}</Col>
            </Row>
          ))}
        </Grid>
      ) : null
    );

    const renderAssetInfo = () => (
      <Grid fluid className="AssetPhotoCropper__imginfo">
        <Row>
          <Col xs={4} className="lbl"><FormattedMessage id="cms.assets.form.filetype" /></Col>
          <Col xs={8} className="inf">{metadata && metadata.type}</Col>
        </Row>
        <Row>
          <Col xs={4} className="lbl"><FormattedMessage id="cms.assets.form.dimension" /></Col>
          <Col xs={8} className="inf">{metadata && metadata.dimension}</Col>
        </Row>
        <Row>
          <Col xs={4} className="lbl"><FormattedMessage id="cms.assets.form.title" /></Col>
          <Col xs={8} className="inf">{assetInfo && assetInfo.description}</Col>
        </Row>
        <Row>
          <Col xs={4} className="lbl"><FormattedMessage id="cms.assets.form.filename" /></Col>
          <Col xs={8} className="inf">{metadata && metadata.filename}</Col>
        </Row>
      </Grid>
    );

    const renderCropCoords = () => (
      <div className="AssetPhotoCropper__previews">
        <FormGroup>
          <InputGroup>
            <InputGroup.Addon className="AssetPhotoCropper__input-prelabel">
              <FormattedMessage id="cms.assets.form.x" />
            </InputGroup.Addon>
            <FormControl type="text" value={dataX} readOnly />
            <InputGroup.Addon>px</InputGroup.Addon>
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <InputGroup>
            <InputGroup.Addon className="AssetPhotoCropper__input-prelabel">
              <FormattedMessage id="cms.assets.form.y" />
            </InputGroup.Addon>
            <FormControl type="text" value={dataY} readOnly />
            <InputGroup.Addon>px</InputGroup.Addon>
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <InputGroup>
            <InputGroup.Addon className="AssetPhotoCropper__input-prelabel">
              <FormattedMessage id="cms.assets.form.width" />
            </InputGroup.Addon>
            <FormControl type="text" value={dataW} readOnly />
            <InputGroup.Addon>px</InputGroup.Addon>
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <InputGroup>
            <InputGroup.Addon className="AssetPhotoCropper__input-prelabel">
              <FormattedMessage id="cms.assets.form.height" />
            </InputGroup.Addon>
            <FormControl type="text" value={dataH} readOnly />
            <InputGroup.Addon>px</InputGroup.Addon>
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <InputGroup>
            <InputGroup.Addon className="AssetPhotoCropper__input-prelabel">
              <FormattedMessage id="cms.assets.form.rotate" />
            </InputGroup.Addon>
            <FormControl type="text" value={dataRotate} readOnly />
            <InputGroup.Addon>deg</InputGroup.Addon>
          </InputGroup>
        </FormGroup>
        <div className="AssetPhotoCropper__two-inputs">
          <FormGroup>
            <InputGroup>
              <InputGroup.Addon>
                <FormattedMessage id="cms.assets.form.xscale" />
              </InputGroup.Addon>
              <FormControl type="text" value={dataScaleX} readOnly />
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <InputGroup>
              <InputGroup.Addon>
                <FormattedMessage id="cms.assets.form.yscale" />
              </InputGroup.Addon>
              <FormControl type="text" value={dataScaleY} readOnly />
            </InputGroup>
          </FormGroup>
        </div>
      </div>
    );

    const renderCropToolbar = () => (
      <Row className="AssetPhotoCropper__tool-row">
        <Col xs={12} md={8}>
          <ButtonGroup title="move" bsSize="large" className="AssetPhotoCropper__tool">
            <span><FormattedMessage id="cms.assets.form.move" /></span>
            <Button data-action="move" onClick={this.cropCommand}><span className="fa fa-arrows" /></Button>
          </ButtonGroup>
          <ButtonGroup title="crop" bsSize="large" className="AssetPhotoCropper__tool">
            <span><FormattedMessage id="cms.assets.form.crop" /></span>
            <Button data-action="crop" onClick={this.cropCommand}><span className="fa fa-crop" /></Button>
          </ButtonGroup>
          <ButtonGroup title="scale" bsSize="large" className="AssetPhotoCropper__tool">
            <span><FormattedMessage id="cms.assets.form.scale" /></span>
            <Button data-action="scaley" onClick={this.cropCommand}><span className="fa fa-arrows-v" /></Button>
            <Button data-action="scalex" onClick={this.cropCommand}><span className="fa fa-arrows-h" /></Button>
          </ButtonGroup>
          <ButtonGroup title="move" bsSize="large" className="AssetPhotoCropper__tool">
            <span><FormattedMessage id="cms.assets.form.pan" /></span>
            <Button data-action="panleft" onClick={this.cropCommand}><span className="fa fa-arrow-left" /></Button>
            <Button data-action="panright" onClick={this.cropCommand}><span className="fa fa-arrow-right" /></Button>
            <Button data-action="pandown" onClick={this.cropCommand}><span className="fa fa-arrow-down" /></Button>
            <Button data-action="panup" onClick={this.cropCommand}><span className="fa fa-arrow-up" /></Button>
          </ButtonGroup>
          <ButtonGroup title="rotate" bsSize="large" className="AssetPhotoCropper__tool">
            <span><FormattedMessage id="cms.assets.form.rotate" /></span>
            <Button data-action="rotateleft" onClick={this.cropCommand}><span className="fa fa-rotate-left" /></Button>
            <Button data-action="rotateright" onClick={this.cropCommand}><span className="fa fa-rotate-right" /></Button>
          </ButtonGroup>
          <ButtonGroup title="zoom" bsSize="large" className="AssetPhotoCropper__tool">
            <span><FormattedMessage id="cms.assets.form.zoom" /></span>
            <Button data-action="zoomin" onClick={this.cropCommand}><span className="fa fa-search-plus" /></Button>
            <Button data-action="zoomout" onClick={this.cropCommand}><span className="fa fa-search-minus" /></Button>
          </ButtonGroup>
          <ButtonGroup title="save" bsSize="large" className="AssetPhotoCropper__tool no-sep">
            <span><FormattedMessage id="cms.assets.form.cropsave" /></span>
            <Button data-action="save" onClick={this.cropCommand}><span className="fa fa-check" /></Button>
          </ButtonGroup>
          <ButtonGroup title="cancel" bsSize="large" className="AssetPhotoCropper__tool">
            <span><FormattedMessage id="cms.assets.form.cropcancel" /></span>
            <Button data-action="cancel" onClick={this.cropCommand}><span className="fa fa-times" /></Button>
          </ButtonGroup>
        </Col>
        <Col xs={12} md={4} className="AssetPhotoCropper__aspect-ratio-bar">
          <ToggleButtonGroup type="radio" name="aspectRatio" title="aspect ratio" defaultValue={0}>
            {cropRatios.map((ratio, i) => (
              <ToggleButton key={`ratio${ratio}`} value={i} data-value={ratio} onClick={this.aspectRatioClicked}>{ratio}</ToggleButton>
            ))}
            <ToggleButton data-value="NaN" value={cropRatios.length} onClick={this.aspectRatioClicked} active><FormattedMessage id="cms.assets.form.aspectfree" /></ToggleButton>
          </ToggleButtonGroup>
        </Col>
      </Row>
    );

    return (
      <Fragment>
        <Row>
          <Col xs={12} md={6}>
            <Cropper
              ref={this.cropper}
              aspectRatio={aspectRatio}
              src={croppedImg || imgSrc}
              preview=".AssetPhotoCropper__crop-preview"
              style={{ height: 400 }}
              crossOrigin="use-credentials"
              crop={this.onCropDetailsChange}
            />
          </Col>
          <Col xs={12} md={6} className="AssetPhotoCropper__rightinfo">
            <div className="AssetPhotoCropper__previews">
              <div className="AssetPhotoCropper__crop-preview preview-lg" />
              <div className="AssetPhotoCropper__crop-preview preview-md" />
              <div className="AssetPhotoCropper__crop-preview preview-sm" />
              <div className="AssetPhotoCropper__crop-preview preview-xs" />
            </div>
            {renderAssetInfo()}
          </Col>
          <Col xs={12} md={6} className="AssetPhotoCropper__rightinfo">
            {renderCropCoords()}
            {renderDiffSizes()}
          </Col>
        </Row>
        {renderCropToolbar()}
      </Fragment>
    );
  }
}

AssetPhotoCropper.propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func,
  }),
  onDidMount: PropTypes.func.isRequired,
  assetInfo: PropTypes.shape({
    metadata: PropTypes.shape({
      dimension: PropTypes.string,
      filename: PropTypes.string,
      type: PropTypes.string,
    }),
    versions: PropTypes.arrayOf(PropTypes.shape({})),
    description: PropTypes.string,
  }).isRequired,
  cropRatios: PropTypes.arrayOf(PropTypes.string).isRequired,
  imgSrc: PropTypes.string.isRequired,
};

AssetPhotoCropper.defaultProps = {
  input: {},
};

export default AssetPhotoCropper;

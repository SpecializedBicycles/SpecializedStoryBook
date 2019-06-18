import React, { Component } from 'react';
import * as $ from 'jquery';

class VideoModalButton extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();

    // close all modals
    var $openedModals = $('.gor-modal.gor-active');
    if ($openedModals.length > 0) {
      $openedModals.Modal('hide');
    }

    // get the video link
    var videoLink = e.target.href;

    // open the global modal and add the html in there
    var $modal = $('#globalModal');
    $modal.addClass('modal-video');

    var videoFrameHTML = `
      <div class='responsive-embed responsive-embed-16by9'>
        <iframe src='${videoLink}?autoplay=true' frameborder='0' scrolling='no' width='100%'></iframe>
      </div>
      `

    $('#globalModalContent').html(videoFrameHTML);
    $modal.Modal('show');

    // reset the global modal
    $('.modal-close').click(function() {
        $('#globalModal').hide().removeClass('modal-video');
        $('#globalModalContent').html('');
    });
  }

  render() {
    const {className, URL, linkName} = this.props;
    return (
      <a className={className} href={URL} onClick={this.handleClick}>{linkName}</a>
    );
  }
}

export default VideoModalButton;

